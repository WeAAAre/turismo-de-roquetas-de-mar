import Link from 'next/link';

import FourOhFourIllustration from './(ui)/illustrations/not-found.illustration';
import GenericView from './(ui)/generic-view/generic-view';

const NotFoundPage = () => {
  return (
    <GenericView title="Recurso no encontrado">
      <div className="flex justify-center mx-10">
        <FourOhFourIllustration />
      </div>
      <div className="py-10">
        <p className="text-center mt-6">
          El recurso que buscas no ha sido encontrado.
        </p>
        <Link className="text-[#39f] text-center mt-6 block" href="/">
          Volver al inicio
        </Link>
      </div>
    </GenericView>
  );
};

export default NotFoundPage;
