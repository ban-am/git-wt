import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';

const Events: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { events, grupedEvents } = rootStore.eventStore;

    const replacer = (key: any, value: any) => {
        if (value === null || key === 'author' || key === 'author_username' || key === 'author_id'
        || key === 'commit_count'|| key === 'commit_from'|| key === 'commit_to') {
            return;
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