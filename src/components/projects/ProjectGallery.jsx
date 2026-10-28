import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark, FaMagnifyingGlassPlus, FaImages } from "react-icons/fa6";

function ProjectGallery({ gallery = [], images = [], screenshots = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Support array from gallery, images, or screenshots
  const items = Array.isArray(gallery) && gallery.length > 0
    ? gallery
    : Array.isArray(images) && images.length > 0
      ? images
      : Array.isArray(screenshots) && screenshots.length > 0
        ? screenshots
        : [];

  if (items.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[#FAF6EE]/15 bg-[#211f1e] p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 text-burgundy">
        <FaImages className="w-5 h-5" />
        <h2 className="text-xl font-bold text-[#FAF6EE] tracking-tight">
          Visual Artifacts &amp; Interface Previews
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, idx) => {
          const imgUrl = typeof item === "string" ? item : item?.url;
          const caption = typeof item === "string" ? "" : (item?.caption || item?.title || "");
          const description = typeof item === "string" ? "" : item?.description;

          if (!imgUrl) return null;

          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-xl border border-[#FAF6EE]/10 bg-[#292725] cursor-pointer"
              onClick={() => setSelectedImage({ url: imgUrl, caption, description })}
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={imgUrl}
                  alt={caption || `Visual Artifact ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <span className="text-xs text-[#FAF6EE] font-medium line-clamp-1">
                  {caption || "Click to zoom"}
                </span>
                <span className="p-2 rounded-full bg-burgundy text-[#FAF6EE] shrink-0 ml-2 shadow-lg shadow-burgundy/40">
                  <FaMagnifyingGlassPlus className="w-3.5 h-3.5" />
                </span>
              </div>
              {caption && (
                <div className="p-3 bg-white/[0.02] border-t border-white/5">
                  <p className="text-xs text-[#9AA69A] font-medium">
                    {caption}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl border border-[#FAF6EE]/20 bg-[#1a1817] overflow-hidden shadow-2xl"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#FAF6EE]/10">
                <h3 className="text-sm font-semibold text-[#FAF6EE] truncate">
                  {selectedImage.caption || "Image Preview"}
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close Preview"
                >
                  <FaXmark className="w-5 h-5" />
                </button>
              </div>

              {/* Image */}
              <div className="p-4 flex items-center justify-center bg-black/40 overflow-auto max-h-[calc(90vh-100px)]">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption || "Preview"}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>

              {selectedImage.description && (
                <div className="px-6 py-3 border-t border-white/10 bg-white/[0.02]">
                  <p className="text-xs text-gray-400">
                    {selectedImage.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProjectGallery;
