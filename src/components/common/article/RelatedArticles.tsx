import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { fetchArticleList } from "../../../lib/api";
import { getImageUrl } from "../../utils/image";

type Raw = Record<string, any>;

type RelatedItem = {
  id: number;
  documentId: string;
  title: string;
  banner?: { image?: any } | null;
  viewCountAndSocial?: { viewed?: number } | null;
};

function normalize(raw: Raw): RelatedItem {
  const n = raw?.article ?? raw;
  return {
    id: Number(n?.id ?? raw?.id ?? 0),
    documentId: String(n?.documentId ?? raw?.documentId ?? raw?.slug ?? ""),
    title: String(n?.title ?? raw?.title ?? ""),
    banner: {
      image: n?.banner?.image ?? raw?.banner?.image ?? raw?.image ?? null,
    },
    viewCountAndSocial: {
      viewed:
        n?.viewCountAndSocial?.viewed ?? raw?.viewCountAndSocial?.viewed ?? 0,
    },
  };
}

export default function RelatedArticles({
  currentDocumentId,
}: {
  currentDocumentId: string;
}) {
  const [items, setItems] = useState<RelatedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchArticleList();
        const list: Raw[] = Array.isArray(res?.data) ? res.data : [];
        const norm = list.map(normalize);
        const filtered = norm
          .filter((a) => a.documentId && a.documentId !== currentDocumentId)
          .sort(
            (a, b) =>
              (b.viewCountAndSocial?.viewed ?? 0) -
              (a.viewCountAndSocial?.viewed ?? 0)
          )
          .slice(0, 4);
        setItems(filtered);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentDocumentId]);

  if (loading) return null;
  if (!items.length) return null;

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-bold">บทความที่เกี่ยวข้อง</h3>
        <Link to="/article" className="text-sky-600 text-sm">
          ดูทั้งหมด
        </Link>
      </div>
      <hr className="border-t border-gray-300 mb-4"></hr>
      <div className="space-y-4">
        {items.map((a) => {
          const img = getImageUrl(a.banner?.image, "small");
          const views = a.viewCountAndSocial?.viewed ?? 0;
          return (
            <Link
              key={a.documentId}
              to={`/article/${encodeURIComponent(a.documentId)}`}
              className="flex gap-3 rounded-xl overflow-hidden bg-white"
            >
              {/* <img
                                src={img}
                                alt={a.title}
                                className="w-28 h-20 object-cover rounded-lg flex-shrink-0"
                                loading="lazy"
                            />
                            <div className="min-w-0">
                                <p className="text-[11px] text-emerald-600 font-bold mb-1">Blog</p>
                                <h4 className="text-sm font-semibold leading-snug line-clamp-2">{a.title}</h4>
                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        {views.toLocaleString()}
                                    </span>
                                </div>
                            </div> */}
              <div className="w-full rounded-2xl shadow-md overflow-hidden bg-[#F3F4F6]">
                <img
                  src={img}
                  alt={a.title}
                  className="w-full h-40 object-cover rounded-2xl"
                  loading="lazy"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-tealPrimary">Blog</p>
                  <h3 className="text-base font-semibold text-gray-900 mt-1 line-clamp-2">
                    {a.title}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
