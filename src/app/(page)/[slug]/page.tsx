import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";
import { layouts, metadataPage } from "../../../components/templates/page";
import { fetcher } from "../../../contents";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const query = React.cache(async (_slug: string) => {
  try {
    const query = await fetcher.pages();
    const slug = decodeURIComponent(_slug).toLowerCase();
    const value = query.items.find(i => i.slug === slug);
    if (!value) {
      return undefined;
    }
    return value;
  } catch {
    return undefined;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await query(slug);
  if (!data) {
    return notFound();
  }
  return metadataPage({ data });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await query(slug);
  if (!data) {
    return notFound();
  }
  const Component = layouts[data.layout];
  return <Component data={data} />;
}
