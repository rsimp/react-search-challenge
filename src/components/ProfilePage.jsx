import React from 'react';
import { useParams } from 'react-router-dom';

export default function SearchPage() {
  const { id } = useParams();
  return <div>{`Search Page for ${id}`}</div>;
}
