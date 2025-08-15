import Link from "next/link";
import Image from "next/image";
import 개념집 from "@/public/개념집.svg";
import 문제집 from "@/public/문제집.svg";
import 어휘집 from "@/public/어휘집.svg";
import 마라톤 from "@/public/마라톤.svg";

const quickAccessItems = [
  {
    href: "/concept",
    icon: 개념집,
    alt: "개념집",
    title: "개념집",
    subtitle: "Concept Book",
    bgGradient: "from-teal-300 to-teal-600",
  },
  {
    href: "/vocabulary",
    icon: 어휘집,
    alt: "어휘집",
    title: "어휘집",
    subtitle: "Vocabulary",
    bgGradient: "from-yellow-300 to-yellow-500",
  },
  {
    href: "/workbooks",
    icon: 문제집,
    alt: "문제집",
    title: "문제집",
    subtitle: "Problem Set",
    bgGradient: "from-orange-300 to-orange-600",
  },
  {
    href: "/marathon",
    icon: 마라톤,
    alt: "마라톤",
    title: "마라톤",
    subtitle: "Marathon",
    bgGradient: "from-blue-300 to-blue-600",
  },
];

export default function QuickAccess() {
  return (
    <>
      <h3 className="font-semibold text-gray-900 mb-3">퀵 액세스</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickAccessItems.map((item) => (
          <Link key={item.href} href={item.href} className="block">
            <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <div
                className={`w-10 h-10 bg-gradient-to-b ${item.bgGradient} rounded-lg flex items-center justify-center mb-3`}
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
