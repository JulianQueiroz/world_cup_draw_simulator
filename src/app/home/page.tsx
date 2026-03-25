'use client';

import { ContentWrapper, Main } from './style';
import { Card } from '@/components/ui/card';
import { Button } from '../../../components/ui/button';
import SwitchTabs from '@/components/SwitchTabs';
import SliderComponent from '@/components/Slider';
import TeamSelection from '@/components/TeamSelection';
import GroupCard from '@/components/GroupsCard';
import CompletedSelectionProgress from '@/components/CompletedSelectionProgress';

const Home = () => {
  return (
    <Main>
      <ContentWrapper>
        <SwitchTabs />
        <Card className="relative mx-auto w-full max-w-sm pt-0">
          <SliderComponent />
          <SliderComponent />
          <TeamSelection />
          <GroupCard />
          <CompletedSelectionProgress />
          <Button>Sortear grupos</Button>
          <Button>Re-sortear</Button>
          <Button>Avançar para Mata-Mata</Button>
        </Card>
      </ContentWrapper>
    </Main>
  );
};
export default Home;
