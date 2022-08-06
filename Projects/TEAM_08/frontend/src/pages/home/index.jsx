import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Banner from "components/banner";
import MainLayout from "layout/main";
import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <MainLayout title={"home"}>
      <Banner />
    </MainLayout>
  );
}
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
