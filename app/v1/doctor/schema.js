

const Joi = require("joi");
const { constants } = require('../../../utils/constant');
const { search, page, size, sort, sortOrder, _id, id, isExport } = require('../../../utils/validation');

const objectId = Joi.string().trim().length(24).hex().required(); //use for params

const doctorStatus = Joi.object().keys({
    status: Joi.number().required(),
});


const doctorId = Joi.object({
    userId: Joi.string().trim().length(24).hex().required()
});

const adminAddDoctor = Joi.object().keys({
    fullName: Joi.string().required(),   //.min(3).max(20)
    specialization: Joi.array().required(),
    gender: Joi.number().required(),
    medicalRegistration: Joi.object().keys(({
        registrationNumber: Joi.string().required(),
        year: Joi.string().required(),
        council: Joi.string().required(),
    })),
    education: Joi.array().items(Joi.object({
        degree: Joi.string().required(),
        college: Joi.string().required(),
        year: Joi.string().required(),
    })),
    experience: Joi.string().required(),
    isOwner: Joi.number().required(),
    establishmentName: Joi.string().required(),
    hospitalTypeId: Joi.string().trim().length(24).hex().min(1).required(),
    address: Joi.object().keys(({
        address: Joi.string().required(),
        locality: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().trim().length(24).hex().min(1).required(),
        pincode: Joi.string().required(),
        country: Joi.string().required(),
    })),
    location: Joi.object().keys({
        lat: Joi.number().required(),
        long: Joi.number().required(),
    })

})

const adminEditDoctor = Joi.object().keys({
    fullName: Joi.string().optional(),   //.min(3).max(20)
    specialization: Joi.array().optional(),
    gender: Joi.number().optional(),
    medicalRegistration: Joi.object().keys(({
        registrationNumber: Joi.string().optional(),
        year: Joi.string().optional(),
        council: Joi.string().optional(),
    })),
    education: Joi.array().items(Joi.object({
        degree: Joi.string().optional(),
        college: Joi.string().optional(),
        year: Joi.string().optional(),
    })),
    experience: Joi.string().optional(),
    isOwner: Joi.number().optional(),
    establishmentName: Joi.string().optional(),
    hospitalTypeId: Joi.string().trim().length(24).hex().min(1).optional(),
    address: Joi.object().keys(({
        address: Joi.string().optional(),
        locality: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().trim().length(24).hex().min(1).optional(),
        pincode: Joi.string().optional(),
        country: Joi.string().optional(),
    })),
    location: Joi.object().keys({
        lat: Joi.number().optional(),
        long: Joi.number().optional(),
    })
})

const cancelAppointment = Joi.object().keys({
    appointmentId: Joi.string().trim().length(24).hex().min(1).required(),
    reason: Joi.string().required()
});

const completeAppointment = Joi.object().keys({
    appointmentId: Joi.string().trim().length(24).hex().min(1).required()
});

const doctorAddEstablishment = Joi.object().keys({
    establishmentType: Joi.number().required(),
    name: Joi.string().required(),
    hospitalTypeId: Joi.string().trim().length(24).hex().min(1).required(),
    establishmentPic: Joi.string().required(),
    address: Joi.object().keys(({
        address: Joi.string().required(),
        locality: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().trim().length(24).hex().min(1).required(),
        pincode: Joi.string().required(),
        country: Joi.string().required(),
    })),
    location: Joi.object().keys({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
    }),
    consultationFees: Joi.string().required(),

})

const establishmentId = Joi.object().keys({
    establishmentId: Joi.string().trim().length(24).hex().min(1).required(),
})


const doctorEditEstablishment = Joi.object().keys({
    establishmentType: Joi.number().optional(),
    name: Joi.string().optional(),
    hospitalTypeId: Joi.string().trim().length(24).hex().min(1).optional(),
    establishmentPic: Joi.string().optional(),
    address: Joi.object().keys(({
        address: Joi.string().optional(),
        locality: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().trim().length(24).hex().min(1).optional(),
        pincode: Joi.string().optional(),
        country: Joi.string().optional(),
    })),
    location: Joi.object().keys({
        lat: Joi.number().optional(),
        long: Joi.number().optional(),
    }),
    consultationFees: Joi.string().optional(),
})

const doctorAcceptEstablishment = Joi.object().keys({
    isApproved: Joi.number().required()
})

const steps = Joi.number().valid(...Object.values(constants.PROFILE_STEPS)).required();

const basicDetails = Joi.object({
    fullName: Joi.string().trim().min(3).max(50).required(),
    gender: Joi.number().valid(...Object.values(constants.GENDER)),
    specialization: _id,
    email: Joi.string().trim().email().lowercase(),
    city: Joi.string().trim().min(3).max(50)
}).allow(null);

const medicalRegistration = Joi.object({
    registrationNumber: Joi.string().trim().min(1).default(null),
    council: Joi.string().trim().min(1).default(null),
    year: Joi.string().trim().min(1).default(null)
}).allow(null)

const education = Joi.object({
    degree: Joi.string().trim().min(1),
    college: Joi.string().trim().min(1),
    year: Joi.string().trim().min(1), // key for experience not in educcation
    experience: Joi.string().trim().min(1)
}).allow(null)

const establishmentDetails = Joi.object({
    name: Joi.string().trim().min(3).max(50),
    locality: Joi.string().trim(),
    city: Joi.string().trim(),
    isOwner: Joi.boolean(),
    // phone: Joi.string().trim().required(),
    hospitalTypeId: _id,
    hospitalId: Joi.string().trim().allow(null)
}).allow(null);

const location = Joi.object({
    latitude: Joi.number(),
    longitude: Joi.number()
}).allow(null);

const address = Joi.object({
    locality: Joi.string().trim().min(3).max(250),
    landmark: Joi.string().trim().min(3).max(250),
    city: Joi.string().trim().allow(null),
    state: _id,
    pincode: Joi.string()
        .length(6)
        .pattern(constants.REGEX_FOR_PINCODE)
        .trim(),
    location,
    country: Joi.string().trim()
}).allow(null)

const from = Joi.string().trim();

const to = Joi.string().trim();

const slot = Joi.string().trim();

const timing = Joi.array().items({
    from, to, slot,
});

const establishmentTiming = Joi.array().items({
    id: Joi.number(),
    timing
}).allow(null)

const validationSectionA = Joi.object({
    basicDetails,
    medicalRegistration,
    education,
    establishmentDetails
})

const validationSectionB = Joi.object({
    doctor: Joi.object({
        identityProof: Joi.array().items({
            url: Joi.string().trim(),
            fileType: Joi.string().trim()
        }),
        medicalProof: Joi.array().items({
            url: Joi.string().trim(),
            fileType: Joi.string().trim()
        }),
    }).allow(null).min(1),
    establishmentDetail: Joi.object({
        establishmentProof: Joi.array().items({
            url: Joi.string().trim(),
            fileType: Joi.string().trim()
        }),
        propertyStatus: Joi.number().valid(...Object.values(constants.ESTABLISHMENT_PROOF))
    }).allow(null)
})

const validationSectionC = Joi.object({
    address,
    establishmentTiming,
    consultationFees: Joi.number().allow(null)
})

const doctorCompleteProfile = Joi.object({
    steps,
    isEdit: Joi.boolean().required(),
    isSaveAndExit: Joi.boolean().default(false),
    profileScreen: Joi.number().valid(...Object.values(constants.DOCTOR_SCREENS)),
    records: Joi.any().
        when('steps',
            {
                is: constants.PROFILE_STEPS.SECTION_A,
                then: validationSectionA
            }).
        when('steps',
            {
                is: constants.PROFILE_STEPS.SECTION_B,
                then: validationSectionB
            }).
        when('steps',
            {
                is: constants.PROFILE_STEPS.SECTION_C,
                then: validationSectionC
            })
        .required(),
});

const getDoctorProfile = Joi.object({
    type: Joi.number().valid(...Object.values(constants.PROFILE_DETAILS)).default(constants.PROFILE_DETAILS.OTHERS),
    doctorId: Joi.when('type',
        {
            is: constants.PROFILE_DETAILS.OTHERS,
            then: _id
        })
})

const adminActionDoctor = Joi.object().keys({
    isVerified: Joi.number().required(),
    rejectReason: Joi.string().optional()
})

const adminDoctorList = Joi.object().keys({
    search: Joi.string().default(''),
    page: Joi.number().min(1).default(1),
    size: Joi.number().min(1).default(10),
    specialization: Joi.string(),
    cities: Joi.string(),
    sortBy: Joi.string().default('createdAt'),
    order: Joi.string().default('DESC'),
    isExport: Joi.boolean()
})

const commonList = Joi.object().keys({
    search: Joi.string().default(''),
    page: Joi.number().min(1).default(1),
    size: Joi.number().min(1).default(10),
    sortBy: Joi.string().default('createdAt'),
    order: Joi.string().default('DESC'),
})

const doctorList = Joi.object({
    bloodGroup: Joi.string().trim(),
    gender: Joi.number().valid(...Object.values(constants.GENDER)),
    age: Joi.string().trim(),
    search,
    page,
    size,
    sort,
    sortOrder,
    isExport,
    // type: Joi.number().default()
})

const doctorPatientList = Joi.object().keys({
    upcoming:Joi.string().default(''),
    status: Joi.number().default(''),
    fromDate:Joi.string().default(''),
    toDate:Joi.string().default(''),
    search: Joi.string().default(''),
    page: Joi.number().min(1).default(1),
    size: Joi.number().min(1).default(10),
    isExport: Joi.boolean()
    
})

module.exports = {
    doctorStatus,
    adminAddDoctor,
    adminEditDoctor,
    cancelAppointment,
    completeAppointment,
    doctorCompleteProfile,
    doctorAddEstablishment,
    doctorEditEstablishment,
    doctorAcceptEstablishment,
    getDoctorProfile,
    doctorId,
    adminActionDoctor,
    adminDoctorList,
    commonList,
    establishmentId,
    doctorList,
    doctorPatientList
};