import React, { useEffect, useState } from "react";

import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { Button } from "@mantine/core";

// icons
import {
  Icon as TablerIcon,
  CalendarStats,
  ChevronLeft,
  ChevronRight,
  Notes,
  User,
  PresentationAnalytics,
  FileAnalytics,
  Adjustments,
  Lock,
} from "tabler-icons-react";
import { MdClose } from "react-icons/md";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? ChevronRight : ChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = [
  { label: "Admin", icon: User },
  {
    label: "Categroys",
    icon: Notes,
    initiallyOpened: true,
    links: [
      { label: "Shoes", link: "/" },
      { label: "Shits", link: "/" },
      { label: "Pants", link: "/" },
      { label: "Electronics & Accessories", link: "/" },
      { label: "Computers & Laptos", link: "/" },
      { label: "Mobile & Tables", link: "/" },
    ],
  },
  {
    label: "Events",
    icon: CalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: PresentationAnalytics },
  { label: "Contact Us", icon: FileAnalytics },
  {
    label: "Security",
    icon: Lock,
    links: [{ label: "Change password", link: "/" }],
  },
  { label: "Settings", icon: Adjustments },
];
const HeaderMenu = ({ open, setOpen }) => {
  const [bg, setbg] = useState(false);
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  useEffect(() => {
    setTimeout(() => {
      if (open) {
        setbg(true);
      } else {
        setbg(false);
      }
    }, 100);
  }, [open]);

  return (
    <div
      className={`absolute top-0 left-0  w-full h-auto min-h-screen overflow-auto ${
        bg && "!bg-[#24242454]"
      }  ${
        open && "-translate-x-0"
      }  -translate-x-[1500px] transition-all duration-100 ease-in-out z-40`}
    >
      <div className="w-[80%] md:w-[45%] lg:w-[30%] h-screen top-0 left-0 bg-white ] relative">
        <Button
          className="bg-slate-100 hover:bg-slate-300 transition-all rounded-full duration-200 ease-out outline-none w-12 h-12 p-0 m-0 absolute right-2 top-2"
          onClick={() => setOpen(false)}
        >
          <MdClose className="text-red-500 !text-[20px]" />
        </Button>

        <Box
          sx={(theme) => ({
            minHeight: 220,
            padding: theme.spacing.md,
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          })}
          className="pt-16 px-2"
        >
          {links}
        </Box>
      </div>
    </div>
  );
};

export default HeaderMenu;
