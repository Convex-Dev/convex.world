import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-convex-dark-blue py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
          <a
            href="https://docs.convex.world"
            className="text-white hover:text-convex-sky-blue transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://discord.com/invite/xfYGq4CT7v"
            className="text-white hover:text-convex-sky-blue flex items-center"
          >
            Join Discord 
            <Image 
              src="/images/social_discord.png" 
              alt="Discord" 
              width={16} 
              height={16} 
              className="m-2"
            />
          </a>
          <a
            href="https://github.com/Convex-Dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-convex-sky-blue transition-colors flex items-center"
          >
            Contribute
            <Image 
              src="/images/social_github.png" 
              alt="Github" 
              width={16} 
              height={16} 
              className="m-2"
            />
          </a>
        </div>
      </div>
    </footer>
  );
} 