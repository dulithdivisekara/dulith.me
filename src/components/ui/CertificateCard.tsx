'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';

export interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  verificationUrl?: string;
  imageUrl?: string;
}

export default function CertificateCard({
  title,
  issuer,
  date,
  description,
  verificationUrl,
  imageUrl,
}: CertificateCardProps) {
  return (
    <Card
      title={title}
      description={issuer}
      icon={
        <span className="material-symbols-outlined text-[#0b57d0] dark:text-[#a8c7fa] text-[28px]">
          workspace_premium
        </span>
      }
    >
      <div className="space-y-3">
        {imageUrl && (
          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#f0f4f9] dark:bg-[#282a2c]">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {description && (
          <p className="text-sm text-[#444746] dark:text-[#c4c7c5] leading-relaxed">
            {description}
          </p>
        )}

        {/* MD3-style info rows */}
        <div className="-mx-5 md:-mx-6">
          <div className="flex items-center justify-between py-3 px-5 md:px-6 border-b border-[#e1e3e1] dark:border-[#444746]">
            <span className="text-[14px] text-[#444746] dark:text-[#c4c7c5] w-28 shrink-0">Date Issued</span>
            <span className="text-[15px] text-[#1f1f1f] dark:text-[#e3e3e3] font-medium flex-1">{date}</span>
          </div>

          {verificationUrl && (
            <div className="flex items-center justify-between py-3 px-5 md:px-6">
              <span className="text-[14px] text-[#444746] dark:text-[#c4c7c5] w-28 shrink-0">Credential</span>
              <a
                href={verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[15px] text-[#0b57d0] dark:text-[#a8c7fa] font-medium hover:underline inline-flex items-center gap-1 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0b57d0] rounded-sm"
              >
                Verify Credential
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}
                >
                  open_in_new
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
