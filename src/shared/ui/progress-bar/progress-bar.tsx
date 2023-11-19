export const ProgressBar = (props: { progress: number; isPlayersTurn: boolean }) => {
  return (
    <div>
      <div
        style={{
          width: `${props.progress}%`,
          height: '3px',
          backgroundColor: props.isPlayersTurn ? '#C4B5FD ' : '#DCDCDC',
          transition: props.progress !== 100 ? 'width 1s ease-in-out' : 'none',
        }}
      />
    </div>
  );
};
