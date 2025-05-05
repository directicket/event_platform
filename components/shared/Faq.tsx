import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const Faq = () => {
  return (
    <div className="flex flex-col gap-5">
          <h3 className="h3-medium">Frequently Asked <br/>Questions</h3>
          <hr className="border-neutral-800"/>
          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16">Why choose Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                  Directicket is a first-of-its-kind ticket-focused platform. With Directicket, 
                  you can manage each ticket on its own page with lots of customization options. 
                  Directicket also pays more on average than its closest competing platform and is the 
                  top choice for a wide range of users seeking intelligent control over the 
                  ticketing experience for their events.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">Are there any limits on the amount of tickets that can be sold?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-regular-14 max-w[300px] md:max-w-[500px]">
                  On Directicket, you can sell as many tickets as you want. We&apos;re ready for crowds of every size.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">Are there any fees associated with using Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                  Directicket charges a service fee of 7.5% of the ticket price to customers. 
                  The only money we make is from the service fee we charge to customers at checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">How fast do I get paid using Directicket?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                  Payouts happen every business day on Directicket. Which excludes public holidays and Sundays.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col justify-center gap-8 mt-[-20px]">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-semibold-16 text-left text-wrap">How can I get in contact with customer support?</AccordionTrigger>
                <AccordionContent className="text-neutral-500 p-regular-14 md:max-w-[500px]">
                  You can DM us on Instagram @directicket.live or call either 09025771255 or 09035960581.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
  )
}

export default Faq