import React, {useEffect, useRef} from 'react';
import OrgChart from '@balkangraph/orgchart.js';

const OrgChartComponent = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer.current) {
            new OrgChart(
                chartContainer.current, {
                template: "mery",
                //scaleInitial: OrgChart.match.boundary,
                layout: OrgChart.mixed,
                nodeBinding: {
                    field_0: "name",
                    field_1: "title"
                },
                nodes: data
            });
        }
    }, [data]);

    return <div ref={chartContainer} id="orgchart-container" style={{ height: '100vh', width: '100%' }}></div>;
};

export default OrgChartComponent;
