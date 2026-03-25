import { NationsBox, SearchBar } from "@/app/home/style";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Content } from "./style";

const TeamSelection = () => {
  return (
    <Content>
      <SearchBar>
        <Input placeholder="Pesquise por seleções" />
      </SearchBar>

      <NationsBox>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Verifiedrrrrrrr</Badge>
          <Badge variant="outline">Bookmark</Badge>
        </div>
      </NationsBox>
    </Content>
  );
};
export default TeamSelection