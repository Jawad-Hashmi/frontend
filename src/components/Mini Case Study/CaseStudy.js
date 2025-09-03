import { Card, CardContent, CardHeader, CardTitle } from "../Ui/Cards";
import { ArrowRight } from "lucide-react";

export default function MiniCaseStudy() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-12 max-w-6xl mx-auto">
      {/* Left Section */}
      <Card className="bg-black text-white rounded-2xl shadow-lg">
        <CardContent className="p-8 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Digital transformation in auto retail: The MINI Anywhere case-study
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              In June 2021, MINI USA launched their groundbreaking digital retail
              platform, MINI Anywhere, developed in collaboration with NETSOL
              Technologies. Built on NETSOL's Transcend Retail platform (formerly
              known as Otoz), MINI Anywhere is a bespoke solution designed to meet
              MINI USA's specific needs, offering customers a seamless, end-to-end
              digital purchasing experience.
            </p>
            {/* Replace Button with regular button */}
            <button className="bg-white text-black font-semibold hover:bg-black hover:text-white border border-transparent hover:border-1 hover:border-white px-4 py-2 rounded-md inline-flex items-center">
              Download Now <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <img
              src="/Jawad.jpg"
              alt="Jawad"
              width={250}
              height={200}
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>

      {/* Right Section */}
      <div className="flex flex-col justify-center p-8">
        <span className="bg-black text-white text-xs px-4 py-1 rounded-full font-semibold w-fit mb-4">
          RESOURCE CENTER
        </span>
        <h2 className="text-2xl font-bold mb-4">Insights</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Discover the latest content on the most important topics in and around
          financial services and technology. Read our articles, case-studies,
          white papers and more. Watch our on-demand webinars as our industry
          experts share their perspectives about the industry.
        </p>
        {/* Replace Button with regular button */}
        <button className="bg-black text-white font-semibold hover:bg-white hover:text-black border border-transparent hover:border-1 hover:border-black px-4 py-2 rounded-md inline-flex items-center w-fit">
          Discover Insights <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}