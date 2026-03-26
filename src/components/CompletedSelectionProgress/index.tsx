import { Field, FieldLabel } from "../ui/field";
import { Progress } from "../ui/progress";

type Props = {
  selectedCount: number
  maxTeams: number
}

const CompletedSelectionProgress = ({selectedCount, maxTeams}:Props) => {
  const progressValue = (selectedCount / maxTeams) * 100
  
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="progress-upload">
        <span>{selectedCount}/{maxTeams}</span>
        <span className="ml-auto">Teste</span>
      </FieldLabel>
      <Progress value={progressValue}  id="progress-upload" />
    </Field>
  );
};
export default CompletedSelectionProgress