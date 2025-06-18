import React from 'react';
import { FaFingerprint, FaRegSmile } from 'react-icons/fa';

const BiometricIcon = ({ method }) => {
  return method === 'face' ? (
    <FaRegSmile className="text-xl" />
  ) : (
    <FaFingerprint className="text-xl" />
  );
};

export default BiometricIcon;