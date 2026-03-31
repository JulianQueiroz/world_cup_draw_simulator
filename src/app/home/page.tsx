'use client';

import { useEffect, useState } from 'react';
import { ContentWrapper, GroupsLayout, Main } from './style';
import { TournamentBracket } from '../../components/TournamentBracket';
import { useStore } from '../../lib/store';
import SwitchTabs from '../../components/SwitchTabs';
import Menu from '../../components/Menu';
import Groups from '../../components/Groups';
import { generateTournamentFromGroups } from '../../lib/knockout';
import { drawRepository } from '../../lib/repository/drawRepository';
import { AnimatePresence, motion } from 'framer-motion';

const Home = () => {
  const [activeTab, setActiveTab] = useState('groups');
  const { groups, setGroups, tournament, setTournament } = useStore();
  const showKnockout = activeTab === 'knockout';
  const hasGroups = groups.length > 0;

  useEffect(() => {
    const savedGroups = drawRepository.loadGroups();
    const savedTournament = drawRepository.loadTournament();

    if (savedGroups.length > 0) {
      setGroups(savedGroups);
    }

    if (savedTournament) {
      setTournament(savedTournament);
    } else if (savedGroups.length > 0) {
      const generatedTournament = generateTournamentFromGroups(savedGroups, 2);
      setTournament(generatedTournament);
    }
  }, [setGroups, setTournament]);

  useEffect(() => {
    if (tournament) {
      drawRepository.saveTournament(tournament);
    }
  }, [tournament]);

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
              transition={{ duration: 0.2 }}
              className="w-full">
              <GroupsLayout
                animate={{
                  justifyContent: hasGroups ? 'flex-start' : 'center',
                }}
                transition={{ duration: 0.4 }}>
                <motion.div layout transition={{ type: 'spring', stiffness: 120, damping: 20 }}>
                  <Menu setActiveTab={setActiveTab} />
                </motion.div>

                {/* GROUPS */}
                {hasGroups && (
                  <motion.div
                    key="groups-content"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3 }}>
                    <Groups />
                  </motion.div>
                )}
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
      </ContentWrapper>
    </Main>
  );
};

export default Home;
