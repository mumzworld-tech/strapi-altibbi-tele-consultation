import type { Schema, Struct } from '@strapi/strapi';

export interface ContentCheckedList extends Struct.ComponentSchema {
  collectionName: 'components_content_checked_lists';
  info: {
    displayName: 'CheckedList';
  };
  attributes: {
    items: Schema.Attribute.Component<'content.list', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentCustomer extends Struct.ComponentSchema {
  collectionName: 'components_content_customers';
  info: {
    displayName: 'Customer';
  };
  attributes: {
    countryCode: Schema.Attribute.String;
    fullName: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface ContentGallery extends Struct.ComponentSchema {
  collectionName: 'components_content_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    file: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface ContentList extends Struct.ComponentSchema {
  collectionName: 'components_content_lists';
  info: {
    displayName: 'List';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface ContentOurProcess extends Struct.ComponentSchema {
  collectionName: 'components_content_our_processes';
  info: {
    displayName: 'OurProcess';
  };
  attributes: {
    items: Schema.Attribute.Component<'content.process-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface ContentOverview extends Struct.ComponentSchema {
  collectionName: 'components_content_overviews';
  info: {
    displayName: 'Overview';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ContentPhoneCountryCode extends Struct.ComponentSchema {
  collectionName: 'components_content_phone_country_codes';
  info: {
    displayName: 'PhoneCountryCode';
  };
  attributes: {
    countryCode: Schema.Attribute.Enumeration<['AE', 'SA']>;
  };
}

export interface ContentProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_content_process_steps';
  info: {
    displayName: 'ProcessStep';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface ContentSlider extends Struct.ComponentSchema {
  collectionName: 'components_content_sliders';
  info: {
    displayName: 'Slider';
  };
  attributes: {
    maximum: Schema.Attribute.Integer;
    minimum: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    value: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.checked-list': ContentCheckedList;
      'content.customer': ContentCustomer;
      'content.gallery': ContentGallery;
      'content.list': ContentList;
      'content.our-process': ContentOurProcess;
      'content.overview': ContentOverview;
      'content.phone-country-code': ContentPhoneCountryCode;
      'content.process-step': ContentProcessStep;
      'content.slider': ContentSlider;
    }
  }
}
