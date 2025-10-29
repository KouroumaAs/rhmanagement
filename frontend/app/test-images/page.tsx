"use client";

export default function TestImagesPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-8">Test des Images</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Badge Recto</h2>
          <div className="border border-gray-300 p-4">
            <img
              src="/badgeRecto.jpeg"
              alt="Badge Recto"
              style={{ maxWidth: '100%', height: 'auto' }}
              onError={(e) => {
                console.error('Erreur chargement badgeRecto:', e);
                e.currentTarget.style.border = '2px solid red';
              }}
              onLoad={() => {
                console.log('badgeRecto chargé avec succès');
              }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Badge Verso</h2>
          <div className="border border-gray-300 p-4">
            <img
              src="/badgeVerso.jpeg"
              alt="Badge Verso"
              style={{ maxWidth: '100%', height: 'auto' }}
              onError={(e) => {
                console.error('Erreur chargement badgeVerso:', e);
                e.currentTarget.style.border = '2px solid red';
              }}
              onLoad={() => {
                console.log('badgeVerso chargé avec succès');
              }}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Logo DSD</h2>
          <div className="border border-gray-300 p-4">
            <img
              src="/LogoDSD.jpeg"
              alt="Logo DSD"
              style={{ maxWidth: '200px', height: 'auto' }}
              onError={(e) => {
                console.error('Erreur chargement LogoDSD:', e);
                e.currentTarget.style.border = '2px solid red';
              }}
              onLoad={() => {
                console.log('LogoDSD chargé avec succès');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
