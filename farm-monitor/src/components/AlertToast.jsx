import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AlertToast({ message, type = "error", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle className="w-5 h-5 text-white" />,
    },
    error: {
      bg: "bg-red-500",
      icon: <AlertCircle className="w-5 h-5 text-white" />,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <AlertTriangle className="w-5 h-5 text-white" />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <Info className="w-5 h-5 text-white" />,
    },
  };

  const { bg, icon } = typeConfig[type] || typeConfig.error;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ duration: 0.3 }}
          className={`${bg} text-white p-4 rounded-xl shadow-lg fixed top-5 right-5 z-50 flex items-center gap-3 min-w-[250px]`}
        >
          {icon}
          <span className="flex-1 text-sm font-medium">{message}</span>
          <button onClick={() => setVisible(false)} className="text-white hover:text-gray-200">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
