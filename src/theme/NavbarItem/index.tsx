import React from 'react';
import OriginalNavbarItem from '@theme-original/NavbarItem';
import ProductsNavbarItem from './ProductsNavbarItem';

export default function NavbarItem(props: any) {
    const { type } = props;
    
    if (type === 'custom-products') {
        return <ProductsNavbarItem {...props} />;
    }
    
    return <OriginalNavbarItem {...props} />;
}
