import CodeBlock, { type CodeTab } from "@/components/docs/CodeBlock";
import { buildInstallTabs } from "@/utils/install";

interface Props {
  packageName: string;
}

const PackageTabs = ({ packageName }: Props) => {
  const tabs: CodeTab[] = buildInstallTabs(packageName);

  return <CodeBlock tabs={tabs} title="Instalacion" wrap />;
};

export default PackageTabs;
