import { AppWindowIcon, CodeIcon, Menu } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Groups from "../Groups"
import { useState } from "react"
type Props = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};
const SwitchTabs = ({activeTab,setActiveTab}:Props) => {
    const [tab,setTab] = useState('groups')
    
    return(
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="groups">Fase de Grupos</TabsTrigger>
        <TabsTrigger value="knockout">Mata-Mata</TabsTrigger>
      </TabsList>
    </Tabs>
    )
}

export default SwitchTabs