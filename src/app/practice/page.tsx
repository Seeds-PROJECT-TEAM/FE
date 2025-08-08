import React from "react";
import Image from "next/image";
import Link from "next/link";

// SVG 이미지들을 임시로 placeholder로 처리
// 실제 파일들을 public 폴더에 넣고 경로를 수정하세요
import 개념집 from "./개념집.svg";
import 문제집 from "./문제집.svg";
import 어휘집 from "./어휘집.svg";
import 마라톤 from "./마라톤.svg";

export default function PracticePage(): JSX.Element {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-8">
      <div className="bg-gray-100 relative max-w-7xl w-full">
        {/* 추천 학습 경로 헤더 */}
        <div className="bg-white rounded-3xl border-2 border-gray-300 p-8 mb-12 mx-4">
          <h1 className="font-semibold text-gray-800 text-4xl mb-4">
            추천 학습 경로
          </h1>
          <p className="font-normal text-gray-500 text-xl">
            지금까지 잘 따라오셨어요! 다음으로 학습하면 좋은 단원을
            보여드릴게요.
          </p>
        </div>

        {/* 학습 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-4xl mx-auto">
          {/* 개념집 카드 */}
          <Link href="/concepts" className="block">
            <div className="w-full h-96 rounded-3xl bg-gradient-to-b from-teal-300 to-teal-600 relative cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center pt-6">
                <Image
                  className="w-60 h-60"
                  alt="개념집"
                  src={개념집}
                  width={30}
                  height={30}
                />
              </div>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-white text-4xl text-center mb-4">
                  개념집
                </h3>

                <div className="text-center">
                  <span className="font-medium text-white text-xl border-b border-white pb-1">
                    바로가기
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* 문제집 카드 */}
          <Link href="/problems" className="block">
            <div className="w-full h-96 rounded-3xl bg-gradient-to-b from-orange-300 to-orange-600 relative cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center pt-6">
                <Image
                  className="w-60 h-60"
                  alt="문제집"
                  src={문제집}
                  width={30}
                  height={30}
                />
              </div>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-white text-4xl text-center mb-4">
                  문제집
                </h3>

                <div className="text-center">
                  <span className="font-medium text-white text-xl border-b border-white pb-1">
                    바로가기
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* 어휘집 카드 */}
          <Link href="/vocabulary" className="block">
            <div className="w-full h-96 rounded-3xl bg-gradient-to-b from-yellow-300 to-yellow-500 relative cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center pt-6">
                <Image
                  className="w-60 h-60"
                  alt="어휘집"
                  src={어휘집}
                  width={30}
                  height={30}
                />
              </div>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-white text-4xl text-center mb-4">
                  어휘집
                </h3>

                <div className="text-center">
                  <span className="font-medium text-white text-xl border-b border-white pb-1">
                    바로가기
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* 마라톤 카드 */}
          <Link href="/marathon" className="block">
            <div className="w-full h-96 rounded-3xl bg-gradient-to-b from-blue-300 to-blue-600 relative cursor-pointer hover:scale-105 transition-transform duration-200">
              <div className="flex justify-center pt-6">
                <Image
                  className="w-60 h-60"
                  alt="마라톤"
                  src={마라톤}
                  width={30}
                  height={30}
                />
              </div>

              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-white text-4xl text-center mb-4">
                  마라톤
                </h3>

                <div className="text-center">
                  <span className="font-medium text-white text-xl border-b border-white pb-1">
                    바로가기
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
