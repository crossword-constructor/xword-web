import React, { useState } from 'react';
import styled from '@emotion/styled';

const SidePanel = ({ state }) => {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Container>
      <Tabs>
        {tabData.map((tab, i) => (
          <Tab
            key={tab.title}
            {...tab}
            role="button"
            onClick={() => {
              setCurrentTab(i);
            }}
          >
            {tab.title}
          </Tab>
        ))}
      </Tabs>
      <div>{tabData[currentTab].title}</div>
    </Container>
  );
};

export default SidePanel;

const tabData = [
  {
    title: 'Fill',
  },
  {
    title: 'Clues',
  },
  {
    title: 'Analysis',
  },
  {
    title: 'Word lists',
  },
  {
    title: 'Settings',
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
