'use client';
import React, { useEffect, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

const StyledNode = styled.div`
    padding: 15px;
   
    /* Adjust padding as needed */
    border-radius: 6px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    border: 1px solid red;
    text-align: center; /* Center text */
    position: relative;
    width: auto;
    font-size: 12px;
`;

const AdditionalLabel = styled.div`
    font-size: 12px; /* Smaller font size */
    color: black;
    font-weight: bold;
    margin-bottom: 3px; /* Reduced space between labels */
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0px; /* Adjust space from the right */
    top: 50%;
    transform: translateY(-50%); /* Center vertically */
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 2px;

    &:hover {
        color: #007bff;
    }
`;

const NodeContent = ({ mainLabel, additionalLabel, onButtonClick }) => (
    <StyledNode>
        <AdditionalLabel>{additionalLabel}</AdditionalLabel>
        <div>{mainLabel}</div> {/* Ensure mainLabel is in a div or other block element */}
        <Button onClick={onButtonClick}>
            <OpenInFullIcon style={{ fontSize: 'small' }} />
        </Button>
    </StyledNode>
);


const StyledTreeExample = () => {
    const [treeData, setTreeData] = useState([
        {
            "id": 1,
            "label": "Child 1",
            "additionalLabel": "Add. Label 1",
            "children": [
                {
                    "id": 11,
                    "label": "Grand Child",
                    "additionalLabel": "Add. Label 1.1",
                    "children": []
                }
            ]
        },
        {
            "id": 2,
            "label": "Child 2",
            "additionalLabel": "Add. Label 2",
            "children": [
                {
                    "id": 21,
                    "label": "Grand Child",
                    "additionalLabel": "Add. Label 2.1",
                    "children": [
                        {
                            "id": 211,
                            "label": "Great Grand Child 1",
                            "additionalLabel": "Add. Label 2.1.1",
                            "children": [{
                                "id": 2111,
                                "label": "Great Great Grand Child 1",
                                "additionalLabel": "Add. Label 2.1.1.1",
                                "children": [{
                                    "id": 21111,
                                    "label": "Great Great Great Grand Child 1",
                                    "additionalLabel": "Add. Label 2.1.1.1.1",
                                    "children": []
                                }]
                            },]
                        },
                        {
                            "id": 212,
                            "label": "Great Grand Child 2",
                            "additionalLabel": "Add. Label 2.1.2",
                            "children": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 3,
            "label": "Child 3",
            "additionalLabel": "Add. Label 3",
            "children": [
                {
                    "id": 31,
                    "label": "Grand Child 1",
                    "additionalLabel": "Add. Label 3.1",
                    "children": []
                },
                {
                    "id": 32,
                    "label": "Grand Child 2",
                    "additionalLabel": "Add. Label 3.2",
                    "children": []
                }
            ]
        }
    ]);

    /*useEffect(() => {
      // Burada back-end API'nizi çağırarak veri çekiyoruz
      fetch('https://api.example.com/treeData') // API endpoint'inizi buraya ekleyin
        .then(response => response.json())
        .then(data => setTreeData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);*/

    // Veriyi TreeNode bileşenlerine dönüştüren recursive fonksiyon
    const handleButtonClick = (nodeId) => {
        alert(`Button clicked for node ${nodeId}`);
    };

    const renderTreeNodes = (nodes) => {
        return nodes.map((node) => (
            <TreeNode
                key={node.id}
                label={
                    <NodeContent
                        mainLabel={node.label}
                        additionalLabel={node.additionalLabel}
                        onButtonClick={() => handleButtonClick(node.id)}
                    />
                }
            >
                {node.children && renderTreeNodes(node.children)}
            </TreeNode>
        ));
    };

    return (
        <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<NodeContent mainLabel="Root" additionalLabel="Root Add. Label" onButtonClick={() => handleButtonClick('root')} />}
        >
            {renderTreeNodes(treeData)}
        </Tree>
    );
};

export default StyledTreeExample;