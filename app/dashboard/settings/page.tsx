"use client";

import React from "react";
import {Button, Tab, Tabs} from "@nextui-org/react";
import {Icon} from "@iconify/react";

import ProfileSetting from "@/components/dashboard/setting/profile-setting";
import AppearanceSetting from "@/components/dashboard/setting/appearance-setting";
import AccountSetting from "@/components/dashboard/setting/account-setting";
import BillingSetting from "@/components/dashboard/setting/billing-setting";
import TeamSetting from "@/components/dashboard/setting/team-setting";

export default function SettingsPage() {
  return (
    <>
      {/* Title */}
      <div className="flex items-center gap-x-3">
        <Button isIconOnly className="sm:hidden" size="sm" variant="flat">
          <Icon
            className="text-default-500"
            icon="solar:sidebar-minimalistic-linear"
            width={20}
          />
        </Button>
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">Settings</h1>
      </div>
      <h2 className="mt-2 text-small text-default-500">
        Customize settings, email preferences, and web appearance.
      </h2>
      {/*  Tabs */}
      <Tabs
        fullWidth
        classNames={{
          base: "mt-6",
          cursor: "bg-content1 dark:bg-content1",
          panel: "w-full p-0 pt-4",
        }}
      >
        <Tab key="profile" title="Profile">
          <ProfileSetting />
        </Tab>
        <Tab key="appearance" title="Appearance">
          <AppearanceSetting />
        </Tab>
        <Tab key="account" title="Account">
          <AccountSetting />
        </Tab>
        <Tab key="billing" title="Billing">
          <BillingSetting />
        </Tab>
        <Tab key="team" title="Team">
          <TeamSetting />
        </Tab>
      </Tabs>
    </>
  );
}