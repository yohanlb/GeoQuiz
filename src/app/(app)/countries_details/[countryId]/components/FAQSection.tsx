import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@components/ui/card';

type FAQ = {
  question: string;
  answer: string;
  category?: string;
};

type Props = {
  faqs: any; // JSON data
};

const FAQSection = ({ faqs }: Props) => {
  let parsedFAQs: FAQ[] = [];
  
  try {
    if (typeof faqs === 'string') {
      parsedFAQs = JSON.parse(faqs);
    } else if (Array.isArray(faqs)) {
      parsedFAQs = faqs;
    }
  } catch (error) {
    console.error('Error parsing FAQs:', error);
    return null;
  }

  if (!parsedFAQs.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Common questions and answers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {parsedFAQs.map((faq, index) => (
            <details
              key={index}
              className='group rounded-lg border border-gray-200 dark:border-gray-700'
            >
              <summary className='flex cursor-pointer items-center justify-between p-4 font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800'>
                <div className='flex-1'>
                  {faq.category && (
                    <span className='mb-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                      {faq.category}
                    </span>
                  )}
                  <p className='text-left'>{faq.question}</p>
                </div>
                <span className='ml-4 transform transition-transform duration-200 group-open:rotate-180'>
                  ▼
                </span>
              </summary>
              <div className='border-t border-gray-200 p-4 dark:border-gray-700'>
                <p className='leading-relaxed text-gray-700 dark:text-gray-300'>
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQSection;