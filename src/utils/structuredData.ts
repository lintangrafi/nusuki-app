import { siteConfig } from "./seoConfig";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "description": siteConfig.description,
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian"]
    }
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Pos Pengumben No.1",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    }
  ],
  "sameAs": []
};

export const localBusinessSchema = (office: typeof siteConfig.contact.offices[0]) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": `${siteConfig.name} - ${office.name}`,
  "image": `${siteConfig.url}/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": office.address,
    "addressLocality": office.city,
    "addressCountry": "ID"
  },
  "telephone": Array.isArray(office.phone) ? office.phone[0] : office.phone,
  "url": siteConfig.url,
  "priceRange": "$$"
});

export const serviceSchema = (service: { title: string; description: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": service.title,
  "provider": {
    "@type": "Organization",
    "name": siteConfig.name
  },
  "areaServed": siteConfig.serviceAreas.map(area => ({
    "@type": "City",
    "name": area
  })),
  "description": service.description
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${siteConfig.url}${item.url}`
  }))
});

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name
  }
};

export const imageObjectSchema = (image: { url: string; title: string; description?: string }) => ({
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": image.url,
  "name": image.title,
  "description": image.description || image.title
});

export const projectSchema = (project: {
  title: string;
  description: string;
  location?: string;
  client?: string;
  date?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.title,
  "description": project.description,
  "creator": {
    "@type": "Organization",
    "name": siteConfig.name
  },
  ...(project.location && { "locationCreated": project.location }),
  ...(project.client && { "sponsor": project.client }),
  ...(project.date && { "dateCreated": project.date }),
  ...(project.image && { "image": project.image })
});
