
import Link from "next/link";
import { Icon, ICON_NAMES } from "../ui/icon";
import Image from "next/image";
import { AppConfig } from "@/config";

type FooterLinkItem = { [key in "label" | "href"]: string };

interface FooterProps {
  socialMedia: {
    icon: (typeof ICON_NAMES)[number];
    href: string;
  }[];
  footerLinkGroup: {
    title: string;
    children: FooterLinkItem[];
  }[];
}

interface DownloadButton {
  appName: string;
  link: string;
  icon: (typeof ICON_NAMES)[number] | React.ReactNode;
}

function isIconName(icon: string): icon is (typeof ICON_NAMES)[number] {
  return ICON_NAMES.some((item) => item === icon);
}

const FooterLink: React.FC<FooterLinkItem> = (link) => (
  <Link
    href={link.href}
    className="font-medium text-sm hover:underline focus-visible:underline block h-full wrap-anywhere"
  >
    {link.label}
  </Link>
);

const DownloadButton: React.FC<DownloadButton> = ({ appName, link, icon }) => (
  <Link
    href={link}
    className="flex items-center h-full gap-4 rounded-lg bg-dark-grey/40 py-3 px-5 max-[349px]:justify-center"
  >
    {typeof icon === "string" && isIconName(icon) ? (
      <Icon type={icon} size={32} className="shrink-0" />
    ) : (
      icon
    )}
    <div className="flex flex-col max-[349px]:hidden">
      <div className="text-[10px] text-grey leading-2.5">Download</div>
      <div className="font-medium leading-5.5">{appName}</div>
    </div>
  </Link>
);

function Footer({ socialMedia, footerLinkGroup }: FooterProps) {
  return (
    <div className="bg-black-russian flex-col text-white-subtle">
      <div className="p-10 md:px-25 md:py-20 flex gap-6 justify-center max-md:flex-col">
        <div className="lg:w-106">
          <h1 className="mb-5 text-primary font-semibold text-4xl font-poppins">
            {AppConfig.Title}
          </h1>
          <p className="mb-6.5 text-sm font-medium">{AppConfig.Subtitle}</p>
          <div className="flex items-center flex-wrap max-[349px]:justify-center gap-3">
            {socialMedia.map((item, index) => (
              <Link
                key={`socialMedia-${index}`}
                href={item.href}
                className="rounded-full bg-dark-grey/30 p-3.5 hover:bg-primary hover:shadow-[0_6px_20px_0_var(--color-primary)]"
              >
                <Icon type={item.icon} />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid min-[1370px]:grid-cols-4 gap-6 grid-cols-2">
          {footerLinkGroup.map((item, index) => (
            <div className="space-y-5 lg:min-w-50" key={`footer-${index}`}>
              <h1 className="text-lg">{item.title}</h1>
              <ul className="space-y-4">
                {item.children.map((item, index) => (
                  <li key={`topFourCtg-${index}`}>
                    <FooterLink {...item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-5 lg:min-w-50">
            <h1 className="text-lg">Download {AppConfig.Title} di</h1>
            <ul className="space-y-5">
              <li>
                <DownloadButton icon="apple" appName="App Store" link="#" />
              </li>
              <li>
                <DownloadButton
                  icon={
                    <Image
                      src="/google-play.svg"
                      alt="icon google play"
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8"
                    />
                  }
                  appName="Play Store"
                  link="#"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-10 md:px-25 py-6 shadow-[inset_0_1px_0_0_#363B4780] flex text-center justify-center">
        © 2025 - {AppConfig.Title}. All rights reserved
      </div>
    </div>
  );
}

export { Footer };
export type { FooterProps };
