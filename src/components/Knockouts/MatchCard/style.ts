import styled, { css } from 'styled-components';
type TeamButtonProps = {
  $isWinner: boolean;
};


export const MatchWrapper = styled.div`
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(24, 24, 27, 0.95) 0%, rgba(15, 15, 20, 0.98) 100%);
  backdrop-filter: blur(10px);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;

export const TeamButton = styled.button<TeamButtonProps>`
  width: 100%;
  padding: 14px 16px;
  border: 0;
  text-align: left;
  background: transparent;
  color: #f4f4f5;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  ${({ $isWinner }) =>
    $isWinner &&
    css`
      background: linear-gradient(
        90deg,
        rgba(74, 222, 128, 0.28) 0%,
        rgba(74, 222, 128, 0.18) 45%,
        rgba(74, 222, 128, 0.08) 100%
      );
      color: #ffffff;
      font-weight: 700;
      box-shadow:
        inset 0 0 0 1px rgba(134, 239, 172, 0.45),
        0 0 24px rgba(74, 222, 128, 0.12);
    `}
`;

export const TeamInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TeamName = styled.span`
  font-size: 1.05rem;
  line-height: 1.2;
`;

export const ChampionIconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: #f5d76e;
`;