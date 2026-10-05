'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  User,
  Building,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  Archive,
  Trash2,
  ExternalLink,
  Search,
  RotateCcw,
  Sparkles,
  Download,
  Filter,
} from 'lucide-react';
import ConfirmDialog from '@/components/admin/ConfirmDialog';

interface Lead {
  id: string;
  name: string;
  email: string;
  organization?: string;
  serviceInterest?: string;
  message?: string;
  status: 'new' | 'contacted' | 'archived';
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'archived'>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        if (data.leads.length > 0 && !selectedLeadId) {
          setSelectedLeadId(data.leads[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load leads:', err);
      showToast('Error loading leads');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'new' | 'contacted' | 'archived') => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
        showToast(`Lead marked as ${newStatus}`);
      }
    } catch (err) {
      showToast('Failed to update lead status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLeadId === id) setSelectedLeadId(null);
        setDeleteTargetId(null);
        showToast('Lead deleted');
      }
    } catch (err) {
      showToast('Failed to delete lead');
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.organization || '').toLowerCase().includes(q) ||
      (l.message || '').toLowerCase().includes(q) ||
      (l.serviceInterest || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const newCount = leads.filter((l) => l.status === 'new').length;

  const exportCsv = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Email', 'Organization', 'Service Interest', 'Status', 'Message'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.organization || '').replace(/"/g, '""')}"`,
      `"${(l.serviceInterest || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arohana-inquiries-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV successfully');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1.5rem',
            zIndex: 99999,
            backgroundColor: '#111113',
            color: '#FFFFFF',
            padding: '0.55rem 1.15rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Sparkles size={13} color="#4ADE80" />
          {toastMessage}
        </div>
      )}

      {/* Top Header matching case studies directory style */}
      <div
        style={{
          padding: '0.85rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#111113' }}>
            Client Inquiries &amp; Leads
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              backgroundColor: newCount > 0 ? '#FEF2F2' : '#F4F4F5',
              color: newCount > 0 ? '#DC2626' : '#52525B',
              fontWeight: 650,
            }}
          >
            {leads.length} Inquiries {newCount > 0 ? `(${newCount} New)` : ''}
          </span>
          <Link
            href="/admin/contact"
            style={{
              fontSize: '0.78rem',
              color: '#DE322D',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginLeft: '0.25rem',
              fontWeight: 600,
            }}
          >
            <span>Edit Contact Page CMS &rarr;</span>
          </Link>

          {/* Filter segment selector */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#F4F4F5',
              borderRadius: '8px',
              padding: '2px',
              marginLeft: '0.5rem',
            }}
          >
            {(['all', 'new', 'contacted', 'archived'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: statusFilter === status ? '#FFFFFF' : 'transparent',
                  color: statusFilter === status ? '#111113' : '#71717A',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: statusFilter === status ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={fetchLeads}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: '#FFFFFF',
              color: '#111113',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={12} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.12)',
              backgroundColor: '#FFFFFF',
              color: '#111113',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Download size={12} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Inquiries list full-width container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
          {/* Search Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.08)',
              padding: '0.6rem 1rem',
              gap: '0.5rem',
            }}
          >
            <Search size={15} color="#71717A" />
            <input
              type="text"
              placeholder="Search by client name, email, organization, or brief..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: '0.82rem',
                width: '100%',
              }}
            />
          </div>

          {/* Leads List */}
          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', color: '#71717A' }}>
              Loading inquiries...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', color: '#71717A' }}>
              No inquiries found {searchQuery ? `matching "${searchQuery}"` : 'for this filter'}.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    border: lead.status === 'new' ? '1.5px solid #BBF7D0' : '1px solid rgba(0,0,0,0.08)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                  }}
                >
                  {/* Top Bar of Card */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.96rem', fontWeight: 700, color: '#111113' }}>
                          {lead.name}
                        </span>
                        {lead.organization && (
                          <span style={{ fontSize: '0.78rem', color: '#71717A', fontWeight: 500 }}>
                            &bull; {lead.organization}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.55rem',
                            borderRadius: '9999px',
                            backgroundColor:
                              lead.status === 'new'
                                ? '#DCFCE7'
                                : lead.status === 'contacted'
                                ? '#DBEAFE'
                                : '#F4F4F5',
                            color:
                              lead.status === 'new'
                                ? '#15803D'
                                : lead.status === 'contacted'
                                ? '#1D4ED8'
                                : '#71717A',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                          }}
                        >
                          {lead.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#A1A1AA', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={12} />
                        {new Date(lead.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <a
                        href={`mailto:${lead.email}?subject=In Response to Your Inquiry - Ārohana`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(0,0,0,0.12)',
                          backgroundColor: '#111113',
                          color: '#FFFFFF',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                        }}
                      >
                        <Mail size={12} />
                        Reply ({lead.email})
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            lead.id,
                            lead.status === 'contacted' ? 'new' : 'contacted'
                          )
                        }
                        style={{
                          padding: '0.35rem 0.65rem',
                          borderRadius: '9999px',
                          border: '1px solid rgba(0,0,0,0.12)',
                          backgroundColor: '#FFFFFF',
                          color: lead.status === 'contacted' ? '#15803D' : '#111113',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {lead.status === 'contacted' ? 'Mark New' : 'Mark Contacted'}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteTargetId(lead.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          padding: '0.35rem',
                        }}
                        title="Delete Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Scope of Interest Badge */}
                  {lead.serviceInterest && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#52525B', backgroundColor: '#F8F8FA', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.06)' }}>
                        Scope: {lead.serviceInterest}
                      </span>
                    </div>
                  )}

                  {/* Message Body */}
                  <div
                    style={{
                      backgroundColor: '#FAFAFA',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      lineHeight: 1.55,
                      color: '#27272A',
                      border: '1px solid rgba(0,0,0,0.04)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {lead.message || 'No specific project message provided.'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Inquiry?"
        message="Are you sure you want to delete this client inquiry? This cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteTargetId && handleDelete(deleteTargetId)}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
