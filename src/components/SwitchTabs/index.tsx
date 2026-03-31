import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"
import { motion } from "framer-motion"

type Props = {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const tabs = [
  { value: "groups", label: "Fase de Grupos" },
  { value: "knockout", label: "Mata-Mata" },
]

const SwitchTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="relative flex bg-muted p-1 rounded-md">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="relative flex-1 z-10"
          >
            {activeTab === tab.value && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-background rounded-md shadow"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <span className="relative z-10">
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default SwitchTabs