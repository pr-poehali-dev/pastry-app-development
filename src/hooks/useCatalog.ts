import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface Category {
  id: string;
  label: string;
}

interface CatalogData {
  categories: Category[];
  products: Product[];
}

const CATALOG_URL = 'https://functions.poehali.dev/e521b437-9ca9-4a43-99bd-ee46910e28af';

export function useCatalog() {
  const [data, setData] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(CATALOG_URL)
      .then(r => r.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
