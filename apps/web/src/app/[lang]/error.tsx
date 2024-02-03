'use client';
import Link from 'next/link';

import FiveHundredIllustration from './(ui)/illustrations/error.illustration';
import GenericView from './(ui)/generic-view/generic-view';

const ErrorPage = () => {
  return (
    <GenericView title="Error">
      <div className="flex justify-center mx-10 ">
        <FiveHundredIllustration />
      </div>
      <div className="py-10">
        <p className="text-center mt-6">
          ¡Ups! Algo salió mal. Por favor, intenta nuevamente.
        </p>
        <Link className="text-[#39f] text-center mt-6 block" href="/">
          Volver al inicio
        </Link>
      </div>
    </GenericView>
  );
};

export default ErrorPage;
