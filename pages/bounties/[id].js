import { Container } from "../../components/layout";
import { Disclosure } from "@headlessui/react";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import BountyStats from "../../components/bounties/stats";
import fetch from "../../utils/fetcher";

const cards = [
  { name: "Total balance", icon: ScaleIcon, amount: "$120,659.45" },
  {
    name: "Bounties available",

    icon: CheckCircleIcon,
    amount: "47",
  },
  {
    name: "Paid balance",

    icon: CashIcon,
    amount: "$30,659.45",
  },
];

export async function getStaticPaths() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`);

  const paths = data.map((content) => {
    return {
      params: {
        id: content.ID,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/companies`
  );

  const bounties = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bounties/company/${params.id}`
  );

  const stats = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/bounties/stats/company/${params.id}`
  );

  let company = {};
  for (let i = 0; i < companies.length; i++) {
    if (companies[i].ID !== params.id) continue;

    company = companies[i];
    break;
  }

  return {
    props: { company, bounties, stats },
    revalidate: 60,
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Community({ company, bounties, stats }) {
  const metaTags = {
    title: `SolDev - ${company.Name} Bounties`,
    description: company.Description,
    url: `https://soldev.app/bounties/${company.ID}`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center mx-auto prose dark:prose-invert flex flex-col">
        <h1 className="capitalize mx-auto">{company.Name} Bounties</h1>
      </div>

      <div className="mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
              Overview
            </h2>

            {/* Stats */}
            <BountyStats stats={stats} />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10 max-w-5xl mx-auto px-2">
        <dl className="mt-6 space-y-5 w-full">
          {Array.isArray(bounties) &&
            bounties.map((bounty) => (
              <Disclosure as="div" key={bounty.Title}>
                {({ open }) => (
                  <>
                    <dt className="text-lg shadow p-3 rounded-lg bg-white dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-50 hover:shadow-md">
                      <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400 dark:text-gray-300 px-4 py-4 sm:px-6">
                        <div>
                          <span className="text-gray-900 dark:text-gray-200">
                            {bounty.Title}
                          </span>
                        </div>

                        <div className="flex">
                          <span className="text-gray-600 dark:text-gray-200">
                            {bounty.Reward}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel
                      as="dd"
                      className="pr-12 mt-1 shadow rounded-lg p-5 bg-white dark:bg-gray-800 pb-14"
                    >
                      <div className="px-10 sm:px-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-3 prose dark:prose-invert max-w-5xl">
                          {/* Title */}
                          <div className="sm:col-span-1">
                            <h3>Title</h3>
                            <span>{bounty.Title}</span>
                          </div>

                          {/* Reward */}
                          <div className="sm:col-span-1">
                            <h3>Reward</h3>
                            <span>{bounty.Reward}</span>
                          </div>

                          {/* Delivery Date */}
                          <div className="sm:col-span-1">
                            <h3>Delivery Date</h3>
                            <span>{bounty.DeliveryDate}</span>
                          </div>

                          {/* Description */}
                          <div className="sm:col-span-3">
                            <h3>Description</h3>
                            <p>{bounty.Description}</p>
                          </div>

                          {/* Apply */}
                          <div className="sm:col-span-3 mx-auto content-center pt-10">
                            <a
                              type="button"
                              href={bounty.URL}
                              target="_blank"
                              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer px-20 py-3 rounded-lg no-underline content text-lg"
                              rel="noreferrer"
                            >
                              Claim Bounty
                            </a>
                          </div>
                        </dl>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
        </dl>
      </div>
    </Container>
  );
}
