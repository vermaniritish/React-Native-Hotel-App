
import * as React from 'react';
export const navigationRef = React.createRef();
export function navigate(name, params, reset) {
    if (reset) {
        navigationRef.current?.reset({
            index: 0,
            routes: [{ name: name }],
        });
    } else {
        navigationRef.current?.navigate(name, params);
    }
}