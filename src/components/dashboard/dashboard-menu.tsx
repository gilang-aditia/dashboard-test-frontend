import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { DashboardMenus } from "./data/menu";
import { Menu } from "./layout-menu";

export default function DashboardMenu() {
  return (
    <div>
      {DashboardMenus.map((menu) =>
        !menu.links ? (
          <Menu
            key={menu.id}
            label={menu.label}
            href={menu.href}
            icon={menu.icon}
          />
        ) : (
          <Accordion
            type="single"
            collapsible
            className="mt-1 p-1"
            key={menu.id}
          >
            <AccordionItem value={menu.id}>
              <AccordionTrigger className="flex w-full items-center justify-between py-2 text-xs font-medium text-white">
                <span className="flex items-center space-x-2">
                  {menu.icon}
                  <span>{menu.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-1 pl-4">
                {menu.links.map((link) => (
                  <Menu
                    key={link.href}
                    label={link.label}
                    href={link.href}
                    icon={link.icon}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ),
      )}
    </div>
  );
}
