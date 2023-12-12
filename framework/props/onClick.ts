const onClick = (fn: () => void) => ({
    type: 'event',
    click: fn,
});

export default onClick;

