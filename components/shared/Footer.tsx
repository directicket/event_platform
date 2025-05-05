import Image from "next/image"
import Link from "next/link"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/footer-accordion"
import { ArrowUpRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className=" bg-black flex flex-col gap-7 mb-12">
      <hr className="border-neutral-800"/>
      
      <div className="flex flex-col gap-3">
        <p className='p-regular-16 text-neutral-600'>
          Terms & Policies
        </p>
        <div className="flex flex-col justify-center gap-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">Terms of Service</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
              <p>For the purposes of these Terms of Use:<br/>
                “Directicket,” “we,” “our,” or “us” refers to Directicket Inc., the company that owns and operates the Directicket platform. 
                “Platform” refers to all Directicket websites, mobile applications, and related services provided by Directicket Inc.
                “User”, "you", or "your" refers to any individual or entity accessing or using the Platform, including but not limited to visitors, ticket buyers, event organizers, vendors, and other participants.
                “Organizer” refers to any User who creates, lists, or manages events or experiences through the Platform.
                “Attendee” or “Buyer” refers to any User who purchases or registers for a ticket or access to an event or experience through the Platform.
                “Content” refers to all information, text, images, video, audio, and other materials submitted, posted, or otherwise provided on or through the Platform.
                “Account” refers to the registered user profile created to access certain features or services on the Platform.
                “Third-Party Services” refers to services, websites, applications, or content provided by entities other than Directicket, which may be linked to or integrated with the Platform.
                “Terms” or “Terms of Use” refers to this agreement that governs the relationship between Users and Directicket.
                “Force Majeure” refers to events beyond reasonable control, including natural disasters, war, strikes, or disruptions in telecommunications or internet services.
                “Beta Services” refers to experimental or pre-release features or services provided by Directicket that may be subject to additional terms and limitations.
                </p><br/>

              <p>Introduction<br/>
              These Terms of Use govern your use of Directicket, a platform owned and operated by Directicket Inc. By accessing or using Directicket’s website, mobile applications, or related services, you agree to be bound by these Terms of Use. These terms apply to all users, including visitors, ticket buyers, event organizers, and any other individuals accessing the platform.</p><br/>

              <p>Acceptance of Terms<br/>
              By using Directicket, you confirm that you have read, understood, and agreed to these Terms of Use. If you do not agree, you must not use the platform. If you are under the legal age of majority in your jurisdiction, you must have a parent or guardian’s consent to use Directicket.</p><br/>

              <p>Changes to Terms<br/>
              Directicket reserves the right to change, update, or modify these Terms of Use at any time. Changes become effective immediately upon posting. Continued use of the platform after changes are posted constitutes acceptance of the updated terms. It is your responsibility to review the terms regularly.</p><br/>

              <p>Eligibility<br/>
              To use Directicket, you must be at least the minimum legal age required in your country or have the necessary legal capacity to enter into binding agreements. You are responsible for ensuring that your account information is accurate, current, and complete.</p><br/>

              <p>Account Responsibilities<br/>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Directicket immediately of any unauthorized use of your account or any other security breach. Directicket is not liable for losses arising from your failure to protect your account credentials.</p><br/>

              <p>Use of Services<br/>
              You agree to use Directicket only for lawful purposes and in accordance with these Terms of Use. You are prohibited from engaging in activities such as fraud, hacking, scraping, distributing malware, sending spam, impersonating others, or interfering with the operation of the platform.</p><br/>

              <p>Ticket Purchases and Sales<br/>
              When you purchase a ticket on Directicket, you agree to the listed price, event details, and delivery methods. Payment must be made through the accepted payment methods provided on the platform. Refunds and cancellations are subject to Directicket’s refund policy, which may vary by event. Organizers are responsible for fulfilling the events they promote, including resolving disputes with attendees. Directicket acts as a facilitator and is not the organizer or host of events listed on the platform.</p><br/>

              <p>Intellectual Property<br/>
              All content, branding, design, software, and other materials on Directicket are the property of Directicket or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. You may not copy, distribute, sell, or create derivative works based on any part of the platform without express written permission.</p><br/>

              <p>User-Generated Content<br/>
              If you submit content to Directicket, including but not limited to event listings, reviews, or comments, you retain ownership of that content but grant Directicket a worldwide, non-exclusive, royalty-free license to use, display, modify, and distribute that content for the purpose of operating and promoting the platform. Directicket reserves the right to remove or moderate user-generated content that violates these terms or is deemed inappropriate.</p><br/>

              <p>Third-Party Links and Services<br/>
              Directicket may contain links to third-party websites or services that are not owned or controlled by Directicket. We are not responsible for the content, privacy practices, or actions of these third parties. Accessing third-party sites is at your own risk.</p><br/>

              <p>Disclaimers and Limitation of Liability<br/>
              Directicket is provided on an “as is” and “as available” basis without warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the platform will be uninterrupted, secure, or error-free. To the fullest extent permitted by law, Directicket will not be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the platform. Our maximum liability is limited to the amount you paid to Directicket in the twelve months preceding the claim.</p><br/>

              <p>Indemnification<br/>
              You agree to indemnify, defend, and hold harmless Directicket, its affiliates, directors, officers, employees, and agents from any claims, liabilities, damages, losses, or expenses, including reasonable legal fees, arising out of or in connection with your use of the platform, your violation of these terms, or your violation of any rights of a third party.</p><br/>

              <p>Termination<br/>
              Directicket reserves the right to suspend or terminate your account and access to the platform at any time, for any reason, including but not limited to violation of these terms or suspected fraudulent activity. You may stop using the platform at any time. Termination does not relieve you of any obligations or liabilities that arose prior to termination.</p><br/>

              <p>Governing Law and Jurisdiction<br/>
              These Terms of Use are governed by the laws of the jurisdiction where Directicket is incorporated, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved exclusively in the courts located in that jurisdiction.</p><br/>

              <p>Contact Information<br/>
              For questions or concerns about these Terms of Use, you can contact us through the contact details provided on our platform.</p><br/>

              <p>Beta Services<br/>
              If you use any beta or experimental features offered by Directicket, you understand that these services may be incomplete, change unexpectedly, or be discontinued at any time. Your use of beta services is at your own risk.</p><br/>

              <p>Promotions and Discounts<br/>
              Any promotions, coupons, or discounts offered on Directicket are subject to specific terms and conditions, including expiration dates and usage limits. Directicket reserves the right to modify or cancel promotions at any time.</p><br/>

              <p>Force Majeure<br/>
              Directicket is not liable for any failure or delay in performance resulting from causes beyond its reasonable control, including but not limited to natural disasters, power outages, labor disputes, or internet service disruptions.</p><br/>

              <p>Entire Agreement<br/>
              These Terms of Use constitute the entire agreement between you and Directicket regarding the use of the platform and supersede any prior agreements or communications.</p><br/>

              <p>Waiver and Severability<br/>
              If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. No waiver of any term shall be deemed a further or continuing waiver of such term or any other term.</p>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col justify-center gap-8 mt-[-20px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">Privacy Policy</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
              <p>This Privacy Policy explains how we collect, use, and protect your personal information when you use our services. By using our services, you agree to the terms outlined here.</p><br/>

              <p>Definitions<br/>“You” refers to the user of our services.<br/>“We,” “us,” or “our” refers to Directicket.<br/>“Personal data” refers to any information that identifies or can be used to identify an individual.<br/>“Processing” refers to any operation performed on personal data, including collection, use, storage, and deletion.</p><br/>

              <p>Information We Collect<br/>We collect information you provide directly, such as your name, email address, phone number, and payment details when you sign up, make purchases, or contact us.<br/>We collect information automatically, such as your IP address, device type, browser type, and usage data through cookies and similar technologies used for session management and site operations.<br/>We collect transaction metadata from payment processors necessary to complete your purchases.</p><br/>

              <p>How We Use Your Information<br/>We use your information to provide, operate, and maintain our services.<br/>We use your information to communicate with you, including sending transactional emails and service updates.<br/>We use your information to process transactions you initiate.<br/>We use your information for marketing, promotional activities, and service improvements.<br/>We use your information for analytics and research to better understand how our services are used.<br/>We use your information to comply with legal obligations where applicable.</p><br/>

              <p>Legal Basis for Processing<br/>We process your personal data based on one or more of the following legal grounds: your consent, performance of a contract, compliance with legal obligations, and our legitimate interests in providing and improving our services.</p><br/>

              <p>Sharing and Disclosure of Information<br/>We share your information with service providers and partners who assist in delivering our services, subject to appropriate data protection obligations.<br/>We may disclose your information if required by law, regulation, legal process, or government request.<br/>In the event of a business transfer, such as a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p><br/>

              <p>Data Retention<br/>We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. You may delete your account or request deletion of your personal data at any time.</p><br/>

              <p>User Rights<br/>You have the right to access, correct, or delete your personal data. You may also have the right to restrict or object to certain processing and to request data portability. To exercise these rights, please contact us using the information provided below.</p><br/>

              <p>Cookies and Tracking Technologies<br/>We use cookies necessary for session management and site operations. You can manage cookie preferences through your browser settings.</p><br/>

              <p>Security Measures<br/>We implement appropriate technical and organizational measures to protect your personal data, including password hashing, limited backend access, and server protections such as firewalls and proxies.</p><br/>

              <p>International Data Transfers<br/>Your personal data may be processed and stored in countries outside your country of residence. We ensure that such transfers comply with applicable data protection laws.</p><br/>

              <p>Children’s Privacy<br/>Our services are not intended for individuals under the age of 18, and we do not knowingly collect personal data from minors.</p><br/>

              <p>Changes to This Privacy Policy<br/>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website.</p><br/>

              <p>Contact Information<br/>If you have any questions or concerns about this Privacy Policy, please contact us using the contact information provided on our website.</p><br/>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col justify-center gap-8 mt-[-20px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">Return Policy</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
              <p>This Return Policy applies to all ticket sales and related services offered by Directicket.<br/>By purchasing a ticket through Directicket, you agree to the terms outlined below.</p><br/>

              <p>Definitions:<br/>“You” refers to the individual purchasing or holding a ticket through Directicket. “We,” “Our,” or “Directicket” refers to Directicket and its affiliates. “Ticket” refers to any proof of purchase granting access to an event. “Event Organizer” refers to the third-party entity hosting or managing the event. “Refund” refers to the return of funds paid for a ticket, subject to eligibility. “Exchange” refers to switching one ticket for another. “Transfer” refers to assigning your ticket to another person.</p><br/>

              <p>General Policy Statement:<br/>All sales through Directicket are considered final. We provide refunds only under specific, limited circumstances as outlined in this policy. By purchasing, you acknowledge you are responsible for reviewing event details before completing your order.</p><br/>

              <p>Eligibility for Returns or Refunds:<br/>Refunds are granted only under the following highly specific conditions: If an event is cancelled due to unavoidable circumstances such as natural disasters or force majeure events (e.g., tornadoes, meteors). If you request a refund within seven (7) days of purchase, provided you submit your user details for verification. Requests made after seven (7) days will not be honored by Directicket; in such cases, the Event Organizer becomes responsible for addressing refund requests.</p><br/>

              <p>Non-Refundable Items or Situations:<br/>Tickets for events that have already passed. Transaction and service fees.</p><br/>

              <p>Refund Process:<br/>To request a refund, you must complete the designated form on our website. Required information will be specified on that page. Refund processing takes between one (1) to two (2) weeks from the date your request is approved. Refunds are issued to your original payment method, processed by our payment partners, who will return funds to the same account or card used for the purchase.</p><br/>

              <p>Exchanges or Transfers:<br/>Ticket exchanges (for different event dates or ticket types) are not allowed. Ticket transfers (assigning a ticket to another person) are not allowed on the Directicket platform or outside of it.</p><br/>

              <p>Canceled or Rescheduled Events:<br/>If an event is cancelled solely by the Event Organizer, Directicket does not issue refunds; you must contact the organizer directly. If an event is cancelled due to extraordinary circumstances beyond the control of both Directicket and the organizer, Directicket may issue refunds. We do not send automatic notifications for cancelled or rescheduled events; it is the user’s responsibility to stay informed. Once a report is received, Directicket will process the matter internally and proceed accordingly.</p><br/>

              <p>No-Shows / Missed Events:<br/>If you fail to attend an event for which you purchased a ticket, you are not eligible for a refund.</p><br/>

              <p>Disputes:<br/>All refund disputes will be evaluated solely at Directicket’s discretion. We reserve the right to make the final determination on any dispute, prioritizing platform integrity, fairness, and the protection of our business interests. By using Directicket, you agree that Directicket’s decision on refund disputes is binding and final.</p><br/>

              <p>Alternative Refund Forms:<br/>In some cases, the customer may be required to accept alternative forms of compensation such as credits, replacement tickets, or a discount (not exceeding 5%) on one (1) future purchase.</p><br/>

              <p>Changes to This Policy:<br/>We reserve the right to modify or update this Return Policy at any time. Updates will be effective immediately upon posting on our website.</p><br/>

              <p>Contact Information:<br/>For support or refund inquiries, please refer to the contact details provided on our website.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <p className='p-regular-16 text-neutral-600'>
          Contact Us
        </p>

        <Link href='https://x.com/directicket' className="hover:underline">
          <div className="flex flex-row justify-between">
            <p className="p-regular-16 hover:underline">x.com</p>
            <ArrowUpRight width={14} height={14} className='text-white'/>
          </div>
        </Link>

        <Link href='https://instagram.com/directicket.live' className="hover:underline">
          <div className="flex flex-row justify-between">
            <p className="p-regular-16 hover:underline">Instagram</p>
            <ArrowUpRight width={14} height={14} className='text-white'/>
          </div>
        </Link>
      </div>


      <div className="flex flex-col gap-3 mt-4">
        <p className='p-regular-16 text-neutral-600'>
          Company
        </p>
        
        <div className="flex flex-col justify-center gap-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">About Us</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
              <p>Directicket was created to change the way we think about ticketing. We’ve made ticketing simple and personal. You can just create a ticket, instantly, and share it with the world. No fees, no cuts, no gimmicks. Every ticket you sell is yours, 100%.</p><br/>

              <p>Directicket stands for creative freedom, simplicity, and authenticity. We’re here to empower you to create tickets that represent who you are and what your events stand for.</p><br/>

              <p>We’re building something that’s more than just a platform; it’s a space for people who want to do what’s exciting — together.</p><br/>

              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col justify-center gap-8 mt-[-20px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">Use Directicket</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                <div className='flex flex-col gap-2'>
                  <a href='/events/create' className='underline hover:no-underline'>Create a Ticket</a>
                  <a href='/profile' className='underline hover:no-underline '>Your Dashboard</a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col justify-center gap-8 mt-[-20px]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-regular-16">Region & Availability</AccordionTrigger>
              <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                Directicket is a Nigerian based tickceting website. Purchase and payouts can only be made in Nigerian Naira (NGN) at this time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <hr className="border-neutral-800"/>

      <div className="flex flex-row justify-between">
        <p className='p-regular-16 text-neutral-600'>
          Directicket &copy; 2025
        </p>
        <p className='p-regular-16 text-neutral-600'>
          Made in Nigeria
        </p>
      </div>
    </footer>
  )
}

export default Footer