import {
  ArchiveIcon,
  BeakerIcon,
  ChatAlt2Icon,
  ChipIcon,
  FolderIcon,
  PencilAltIcon,
  TerminalIcon,
  VideoCameraIcon,
  InboxIcon,
  TrashIcon,
} from "@heroicons/react/outline";

export function constructSecondaryNavigationData(vertical) {
  // If the url doesn't have the vertical, default to "Solana"
  if (!vertical) {
    vertical = "Solana";
  }

  return {
    Library: [
      {
        name: "Videos",
        href: `/library/${vertical}`,
        icon: VideoCameraIcon,
        disabled: false,
      },
      {
        name: "SDKs & Frameworks",
        href: `/library/${vertical}/sdk`,
        icon: TerminalIcon,
        disabled: false,
      },
      {
        name: "Resources",
        href: `/library/${vertical}/resources`,
        icon: FolderIcon,
        disabled: false,
      },
      {
        name: "Courses",
        href: `/library/${vertical}/courses`,
        icon: PencilAltIcon,
        disabled: false,
      },

      {
        name: "Walkthroughs",
        href: `/library/${vertical}/walkthroughs`,
        icon: ArchiveIcon,
        disabled: false,
      },
      {
        name: "Implementations",
        href: `/library/${vertical}/implementations`,
        icon: BeakerIcon,
        disabled: false,
      },
      {
        name: "Tools",
        href: `/library/${vertical}/tools`,
        icon: ChipIcon,
        disabled: false,
      },
      {
        name: "Submitted",
        href: `/library/submitted`,
        icon: InboxIcon,
        disabled: false,
      },
      {
        name: "Inactive",
        href: `/library/inactive`,
        icon: TrashIcon,
        disabled: false,
      },
    ],
    Community: [
      { name: "Developer Community", href: "/community", icon: ChatAlt2Icon },
      { name: "Solana Support", href: "/community", icon: ChatAlt2Icon },
      { name: "SOLHACK", href: "/community", icon: ChatAlt2Icon },
      { name: "Metaplex", href: "/community", icon: ChatAlt2Icon },
      { name: "Anchor", href: "/community", icon: ChatAlt2Icon },
    ],
  };
}

export const navigation = [
  {
    name: "Library",
    disabled: false,
    url: "/library",
  },
  {
    name: "Community",
    disabled: true,
    url: "/community",
  },
  {
    name: "Calendar",
    disabled: true,
    url: "#",
  },
  {
    name: "Jobs",
    disabled: false,
    url: "https://jobs.solana.com/",
  },
];
