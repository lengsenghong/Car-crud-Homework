

export default function BlogListSkeleton() {
    return (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    style={{
                        backgroundColor: '#f0f0f0',
                        borderRadius: '8px',
                        padding: '1.25rem',
                        height: '180px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <div style={{ width: '70%', height: '1.5rem', backgroundColor: '#ccc', borderRadius: '4px', marginBottom: '0.75rem' }} />
                    <div style={{ width: '100%', height: '0.9rem', backgroundColor: '#ddd', borderRadius: '4px', marginBottom: '0.4rem' }} />
                    <div style={{ width: '90%', height: '0.9rem', backgroundColor: '#ddd', borderRadius: '4px' }} />
                </div>
            ))}
        </div>
    );
}
