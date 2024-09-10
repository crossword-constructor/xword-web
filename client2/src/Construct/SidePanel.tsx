import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useWorkspaceContext } from './WorkspaceContext';
import { Fill } from './SidePanel/Fill';

export const SidePanel = () => {
  const { state } = useWorkspaceContext();
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Container>
      <Tabs>
        {tabData.map((tab, i) => (
          <Tab
            key={tab.title}
            // {...tab}
            role="button"
            onClick={() => {
              setCurrentTab(i);
            }}
          >
            {tab.title}
          </Tab>
        ))}
      </Tabs>
      <div>{tabData[currentTab].content}</div>
    </Container>
  );
};

export default SidePanel;

const tabData = [
  {
    title: 'Fill',
    content: <Fill />,
  },
  {
    title: 'Clues',
    content: <div />,
  },
  {
    title: 'Analysis',
    content: <div />,
  },
  {
    title: 'Word lists',
    content: <div />,
  },
  {
    title: 'Settings',
    content: <div />,
  },
];
const Container = styled.div`
  width: 600px;
  display: flex;
  flex-flow: column;
`;

const Tabs = styled.div`
  display: flex;
  border: 2px solid green;
  justify-content: space-around;
  padding: 8px;
  /* height: 200px; */
`;

const Tab = styled.div`
  color: red;
  cursor: pointer;
`;
