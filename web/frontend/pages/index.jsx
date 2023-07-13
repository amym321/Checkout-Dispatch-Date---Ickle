import {
  Card,
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";
import dotenv from "dotenv";

export default function HomePage() {
  dotenv.config();
  const { t } = useTranslation();
  return (
    <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <p>
          App running
        </p>
      </Layout>
    </Page>
  );
}
