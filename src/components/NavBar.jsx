import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "../../auth";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Ghost, SquarePen } from "lucide-react";

const NavBar = async () => {
  const session = await auth();

  return (
    <>
      <div className="flex flex-row navbar py-1">
        <div className="hidden md:block">
          {session && session?.user ? (
            <ul className="flex flex-row">
               <li className="px-3">
                 <Link href="/" className="px-3 text-2xl">Home</Link>
              </li>  
              <li className="px-3">
                <Link href={`/create`}>
                  <SquarePen size={34} color="black" />
                </Link>
              </li>
              <li className="px-3">
                <img
                  src={session?.user?.image}
                  alt="user"
                  className="rounded-full"
                  width={38}
                  height={38}
                  title={session?.user?.name}
                ></img>
              </li>
              <li className="px-3">
                <form
                  action={async () => {
                    "use server";
                    await signOut("github");
                  }}
                >
                  <Button type="submit">Logout</Button>
                </form>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row">
              <li className="px-3">
                <Link href="/" className="px-3 text-2xl">Home</Link>
              </li>
              <li className="px-3">
                <Ghost size={34} color="black" />
              </li>
              <li className="px-3">
                <form
                  action={async () => {
                    "use server";
                    await signIn("github");
                  }}
                >
                  <Button type="submit">Login</Button>
                </form>
              </li>
            </ul>
          )}
        </div>
        <div className="md:hidden">
          {session && session?.user ? (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex flex-row-reverse px-2"></AccordionTrigger>
                <AccordionContent className="flex flex-row">
                 <Link href="/" className="px-3 text-2xl">Home</Link>  
                  <Link href={`/create`}>
                    <SquarePen size={34} color="black" className="mx-2" />
                  </Link>
                  <img
                    src={session?.user?.image}
                    alt="user"
                    className="rounded-full"
                    width={38}
                    height={38}
                    title={session?.user?.name}
                  ></img>
                  <form
                    action={async () => {
                      "use server";
                      await signOut("github");
                    }}
                  >
                    <Button className="mx-2" type="submit">
                      Logout
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex flex-row-reverse px-2"></AccordionTrigger>
                <AccordionContent className="flex flex-row">
                  <Link href="/" className="px-3 text-2xl">Home</Link>  
                  <Ghost size={34} color="black" />
                  <form
                    action={async () => {
                      "use server";
                      await signIn("github");
                    }}
                  >
                    <Button className="mx-2" type="submit">
                      LogIn
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
