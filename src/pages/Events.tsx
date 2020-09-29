import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';

const Events: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { events, grupedEvents, ignoredFileds } = rootStore.eventStore;

    const replacer = (key: any, value: any) => {
        if (value === null || ignoredFileds.split(" ").includes(key)) {
            return;
        }
        if (key == 'created_at') { 
            return (new Date(value)).toTimeString();
        }
        return value;
    }

    return (
        <>
            {events && (
                Object.keys(grupedEvents).map((key, index) => (
                    <div key={index}>
                        <h4>{key}</h4>
                        {grupedEvents[key].map((x: any, id: any) => (
                            <div key={id}>
                                <pre>{JSON.stringify(x, replacer, 4)}</pre>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </>
    );

};

export default observer(Events);