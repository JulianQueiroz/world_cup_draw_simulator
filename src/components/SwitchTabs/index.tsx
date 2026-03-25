import { AppWindowIcon, CodeIcon } from "lucide-react"
import { Field, FieldLabel } from "../ui/field"
import { Progress } from "../ui/progress"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

const SwitchTabs = () => {
    return(
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Fase de grupos
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Mata-Mata
        </TabsTrigger>
      </TabsList>
    </Tabs>
    )
}

export default SwitchTabs