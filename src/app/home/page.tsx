'use client';

import { useEffect, useState } from 'react';
import { ContentWrapper, GroupsLayout, Main } from './style';
import { TournamentBracket } from '../../components/TournamentBracket';
import { useStore } from '../../lib/store';
import SwitchTabs from '../../components/SwitchTabs';
import Menu from '../../components/Menu';
import { Group } from '../../types/draw';
import Groups from '../../components/Groups';
import { generateTournamentFromGroups } from '../../lib/knockout';
import { drawRepository } from '../../lib/repository/drawRepository';
import { AnimatePresence,motion } from 'framer-motion';

const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const { groups, setGroups, tournament, setTournament } = useStore();
  const showKnockout = activeTab === 'knockout';

  const syncTournament = (groups: Group[]) => {
    localStorage.setItem('drawnGroups', JSON.stringify(groups));
    setTournament(generateTournamentFromGroups(groups, 2));
  };

  useEffect(() => {
    if (groups.length > 0) syncTournament(groups);
  }, [groups]);

  useEffect(() => {
    const groups = drawRepository.loadGroups();
    if (groups.length > 0) setGroups(groups);
  }, []);

  return (
    <Main className="dark:bg-zinc-900 text-black dark:text-white">
      <ContentWrapper>
        <SwitchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <AnimatePresence mode="wait">
          {activeTab === 'groups' && (
            <motion.div
              key="groups"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}>
              <GroupsLayout>
                <Menu setActiveTab={setActiveTab} />
                <Groups />
              </GroupsLayout>
            </motion.div>
          )}

          {showKnockout && (
            <motion.div
              key="knockout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}>
              {tournament ? <TournamentBracket /> : <div>Nenhum mata-mata gerado ainda.</div>}
            </motion.div>
          )}
        </AnimatePresence>
        {showKnockout && tournament && <TournamentBracket />}
        {showKnockout && !tournament && <div>Nenhum mata-mata gerado ainda.</div>}
      </ContentWrapper>
    </Main>
  );
};

export default Home;
